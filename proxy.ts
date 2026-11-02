import {NextRequest, NextResponse} from "next/server"
import {privateRoutes, publicRoutes} from "./app/utilis/routes"

export const proxy = (req: NextRequest) =>{
    const cookieValue = req.cookies.get("token")?.value;
    console.log("Cookie Value:", cookieValue);

    const path = req.nextUrl.pathname;
    console.log("Path:", path);
    console.log("Full Url:", req.url)

    if (cookieValue && publicRoutes.includes(path)){
        console.log("Accessing Public Routes");
        return NextResponse.redirect(new URL ("/src/home", req.url))
    }
    if(!cookieValue && privateRoutes.includes(path)){
        console.log("Accessing Private Routes");
        return NextResponse.redirect(new URL ("/src/signup", req.url))
    }
}
