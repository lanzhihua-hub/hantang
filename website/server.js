const http=require("http"),fs=require("fs"),path=require("path");
const root="C:/Users/32688/Coze/Drive/Isabella/海棠英语/website";
const mime={".html":"text/html; charset=utf-8",".css":"text/css",".js":"application/javascript",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".gif":"image/gif",".svg":"image/svg+xml",".woff":"font/woff",".woff2":"font/woff2",".ttf":"font/ttf",".ico":"image/x-icon",".webp":"image/webp",".mp4":"video/mp4",".json":"application/json"};
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split("?")[0]);
  if(p==="/")p="/index.html";
  const fp=path.join(root,p);
  fs.readFile(fp,(e,d)=>{
    if(e){res.writeHead(404);res.end("Not found: "+p);return;}
    const ext=path.extname(fp).toLowerCase();
    res.writeHead(200,{"Content-Type":mime[ext]||"application/octet-stream"});
    res.end(d);
  });
}).listen(8765,"127.0.0.1",()=>console.log("Server running at http://127.0.0.1:8765/"));
