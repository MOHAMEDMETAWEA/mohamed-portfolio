import { NextResponse } from 'next/server'

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
}

interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
  name: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
}

// Cache for GitHub responses
const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function fetchWithCache<T>(url: string, headers: HeadersInit): Promise<T> {
  const cached = cache.get(url)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T
  }

  const response = await fetch(url, { headers })
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`)
  }

  const data = await response.json()
  cache.set(url, { data, timestamp: Date.now() })
  return data
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'repos'
  const username = searchParams.get('username') || 'MOHAMEDMETAWEA'

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-App',
  }

  try {
    if (type === 'user') {
      const userData = await fetchWithCache<GitHubUser>(
        `https://api.github.com/users/${username}`,
        headers
      )
      
      return NextResponse.json({
        success: true,
        data: {
          login: userData.login,
          avatar_url: userData.avatar_url,
          html_url: userData.html_url,
          name: userData.name,
          bio: userData.bio,
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
        }
      })
    }

    if (type === 'stats') {
      const [userRepos, userData] = await Promise.all([
        fetchWithCache<GitHubRepo[]>(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
          headers
        ),
        fetchWithCache<GitHubUser>(
          `https://api.github.com/users/${username}`,
          headers
        )
      ])

      // Calculate language stats
      const languageStats: Record<string, number> = {}
      let totalStars = 0
      let totalForks = 0

      userRepos.forEach((repo) => {
        if (repo.language) {
          languageStats[repo.language] = (languageStats[repo.language] || 0) + 1
        }
        totalStars += repo.stargazers_count
        totalForks += repo.forks_count
      })

      // Sort languages by frequency
      const sortedLanguages = Object.entries(languageStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 8)
        .map(([name, count]) => ({ name, count }))

      return NextResponse.json({
        success: true,
        data: {
          totalRepos: userData.public_repos,
          totalStars,
          totalForks,
          followers: userData.followers,
          languages: sortedLanguages,
        }
      })
    }

    // Default: fetch repos
    const repos = await fetchWithCache<GitHubRepo[]>(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
      headers
    )

    // Filter and transform repos
    const transformedRepos = repos
      .filter((repo) => !repo.name.startsWith('.'))
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || 'No description available',
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        topics: repo.topics || [],
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
        homepage: repo.homepage,
      }))

    return NextResponse.json({
      success: true,
      data: transformedRepos,
    })
  } catch (error) {
    console.error('GitHub API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch GitHub data',
        data: []
      },
      { status: 500 }
    )
  }
}
