/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const app = new Frog({
  title: 'memes',
  assetsPath: '/',
  basePath: '/api',
})

app.frame('/', (c) => {
  return c.res({
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmfTTgRDdhEns2iNH7nz7TubaHgmjdq3YLybE5xFXEeRiv",
    intents: [
      <TextInput placeholder="Enter text..." />,
      <Button action="/generate">Generate</Button>,
    ],
  })
})

app.frame('/generate', async (c) => {
  const { buttonValue, inputText } = c
  const text = inputText || buttonValue || 'Default Text'

  return c.res({
    image: (
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <img 
          src="https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/Qmeq6SktRCnEEgWSEbXnkV1hoQsAR48yhm6TVadtVGZrJ2" 
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'relative',
          color: 'white',
          fontSize: '60px',
          fontWeight: 'bold',
          fontFamily: 'Arial, Helvetica, sans-serif',
          textAlign: 'center',
          padding: '20px',
          maxWidth: '90%',
          wordWrap: 'break-word',
          lineHeight: '1.2',
        }}>
          {text}
        </div>
      </div>
    ),
    intents: [
      <Button action="/">Restart</Button>
    ],
  })
})

devtools(app, { serveStatic })
export const GET = handle(app)
export const POST = handle(app)