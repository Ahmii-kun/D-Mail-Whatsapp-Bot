
export default class Interface {
  constructor(client){
    this.client = client;
    this.contacts = new Map()
  }
   saveContacts = async (contacts) => {
      if (!this.contacts.has('contacts')) {
          const data = await this.client.DB.getContacts()
          this.contacts.set('contacts', data)
      }
      const data = this.contacts.get('contacts')
      for (const contact of contacts) {
          if (contact.id) {
              const index = data.findIndex(({ id }) => id === contact.id)
              if (index >= 0) {
                  if (contact.notify !== data[index].notify) data[index].notify = contact.notify
                  continue
              }
              data.push({
                  id: contact.id,
                  notify: contact.notify,
                  status: contact.status,
                  imgUrl: contact.imgUrl,
                  name: contact.name,
                  verifiedName: contact.verifiedName
              })
          }
      }
      this.contacts.set('contacts', data)
      await this.client.DB.contact.set('contacts.data', data)
  }

   getContact = (jid) => {
      const contact = this.contacts.get('contacts')
      const isMod = this.client.config.mods.includes(jid)
      if (!contact)
          return {
              username: 'User',
              jid,
              isMod
          }
      const index = contact.findIndex(({ id }) => id === jid)
      if (index < 0)
          return {
              username: 'User',
              jid,
              isMod
          }
      const { notify, verifiedName, name } = contact[index]
      return {
          username: notify || verifiedName || name || 'User',
          jid,
          isMod
      }
  }

  
}


