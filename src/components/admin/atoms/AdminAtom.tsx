import * as React from "react"

interface Props {
  name: string
}

export function AdminAtom({ name }: Props) {
  return <div>AdminAtom hello {name}</div>
}
