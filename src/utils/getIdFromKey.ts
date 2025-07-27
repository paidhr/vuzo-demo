export default function getIdFromKey(key: string): string {
  const id = key?.substring(36)
  return id
}
