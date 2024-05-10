## Backend Development Full Fledged - Hitesh Choudary.

#### [Visit Github](https://github.com/ParvezMah/Backend_Development_Hitesh_Choudary_2024.git)

### 01 - Building a server using Bun & Node.

**Using with Node.js**

```
    if(req.url === "/"){
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        res.end("Hello ice tea")
    }
    else if (req.url === "/ice-tea"){
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        res.end("Thanks for ordering Ice tea. Its really hot")
    }
    else{
        res.statusCode = 404;
        res.setHeader('Content-Type','text/plain');
        res.end("404 | Not Found That Page")
    }
```

Using with Bun.js
```
npm install -g bun

bun --version

bun <file path>
```

```
import {serve} from 'bun';
import { hostname } from 'os';

serve({
    fetch(request){
        const url = new URL(request.url);
        if(url.pathname === "/"){
            return new Response('Hello Ice tea', {status: 200})
        }
        else if(url.pathname === '/ice-tea'){
                return new Response('Ice tea is a good option', {status: 200})
            }
        else{
            {
                return new Response('404 | Not Found that Page with Bun', {status: 404})
            }
        }
    },
    port: 3000,
    hostname: '127.0.0.1'
})
```
