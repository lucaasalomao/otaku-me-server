# Otaku Me - Server

This README contains information about the backend made for Otaku Me Page.

You will find here:
- Mongoose Schema Reference
- Axios API Reference
- Testing Schema

The server makes use of:
- `Express`
- `Mongoose`
- `Dotenv`
- `Cloudinary`
- `Axios`

You can find the `client repository` at [Otaku Me - Client](https://github.com/lucaasalomao/otaku-me-client)

You can find the `planned work` on the [Otaku Me - Planning board](https://miro.com/app/board/uXjVOQyexcw=/?invite_link_id=307959421972)

## Schema Reference

#### User

| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `String` | **Required** - This is the user displayed name - User input |
| `email` | `String` | **Required** AND **Unique** - User input |
| `passwordHash` | `String` | **Required** - User input |
| `userImage` | `String` | **Not Required** - This is the user displayed picture (Default = User Icon) - User input |
| `events` | `Array of ObjectId's` | **Required** - Mongoose generated |

#### Event

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `eventCreator` | `ObjectId` | **Required** - Mongoose generated |
| `eventFormat` | `String` | **Required** - This is the format of the event (OVA, Mangá, Animation, etc.) - User input |
| `eventDate` | `String` | **Required** - This is the date selected by user - User input |
| `eventName` | `String` | **Required** - This is the anime displayed name - User input |
| `eventImage` | `String` | **Not Required** - This is the anime displayed picture (Default = Anime Icon) - User input |
| `eventOccurence` | `Number` | **Required** - Application generated |
| `eventFollowers` | `Array of ObjectId's` | **Required** - Application generated |

## Author

- [@lucassalomao](https://github.com/lucaasalomao)

## Acknowledgements

The completion of this project wouldn't be possible without great people's help behind it.

Here are the ones that made this possible:

 - [@D-Kunrath](https://github.com/D-Kunrath)
 - [@gsicuto](https://github.com/gsicuto)
 - [@ana](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

## Reference

- [Mongoose Schema](https://mongoosejs.com/docs/guide.html)
- [Mongoose Models](https://mongoosejs.com/docs/models.html)
- [Mongoose Connection](https://mongoosejs.com/docs/connections.html)