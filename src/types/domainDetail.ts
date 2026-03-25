export type PublishableContact = {
  handle: string
  organization: string
  name: string
  publish: {
    organization: boolean
    name: boolean
  }
}

export type DnsServer = {
  name: string
  ip_address: string
}

export type Nsset = {
  handle: string
  registrar: string
  dns: DnsServer[]
}

export type Keyset = {
  handle: string
  registrar: string
  dns_keys: string[]
}

export type DomainEvent = {
  timestamp: string
  registrar_handle: string
}

export type StateFlag = {
  name: string
  active: boolean
  description: string
}

export type StateFlags = {
  flags: StateFlag[]
  groups: string[][]
}

export type DomainDetail = {
  fqdn: string
  nsset: Nsset
  keyset: Keyset
  owner: PublishableContact
  sponsoring_registrar: string
  administrative_contacts: PublishableContact[]
  expires_at: string
  events: {
    registered: DomainEvent | null
    transferred: DomainEvent | null
    updated: DomainEvent | null
    unregistered: DomainEvent | null
  }
  state_flags: StateFlags
}