export const db = null as unknown as {
  $connect: () => Promise<void>
  $disconnect: () => Promise<void>
}