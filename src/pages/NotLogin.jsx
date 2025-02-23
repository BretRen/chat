import { Button } from "@components/button";

export default function NotLogin() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center h-screen ">
        <h1 className="text-2xl">Pdnode Chat</h1>
        <Button url={"login"} text={"登录"}></Button>
        <Button color="bg-white" text={"注册"}></Button>
      </div>
    )
}