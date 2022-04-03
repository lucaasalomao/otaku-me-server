# Otaku Me - Server

This README contains information about the backend made for Otaku Me Page.

You will find here:
- Schema Reference
- API Reference

The server makes use of:
- `Express`
- `Mongoose`
- `Dotenv`
- `Cloudinary`

You can find the `client repository` at [Otaku Me - Client](https://github.com/lucaasalomao/otaku-me-client)

You can find the `planned work` on the [Otaku Me - Planning board](https://miro.com/app/board/uXjVOQyexcw=/?invite_link_id=307959421972)

## Schema Reference

#### User

| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `String` | **Required** - This is the user displayed name |
| `email` | `String` | **Required** AND **Unique**  |
| `password-hash` | `String` | **Required**   |
| `userimage` | `Image` | **Not Required** - This is the user displayed picture (Default = User Icon) |
| `agenda-id` | `String` | **Required** AND **Unique** - Mongoose generated |

#### Agenda

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `format` | `string` | **Required** |

#### Event

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `format` | `string` | **Required** |
| `date` | `string` | **Required** - This is the date selected by user|
| `name` | `string` | **Required** - This is the anime displayed name |
| `animeimage` | `string` | **Not Required** - This is the anime displayed picture (Default = Anime Icon)  |
| `ocurrences` | `string` | **Required** - System generated |

## Author

- [@lucassalomao](https://github.com/lucaasalomao)

## Acknowledgements

The completion of this project wouldn't be possible without great people's help behind it.

Here are the ones that made this possible:

 - [@D-Kunrath](https://github.com/D-Kunrath)
 - [@gsicuto](https://github.com/gsicuto)
 - [@ana](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
