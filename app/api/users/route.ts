import ConnectTODb from "@/DB/connect-to-DB";
import userModel from "@/models/user";

export async function POST(req: Request) {
  try {
    const { firstname, lastname, username, email, password, age } =
      await req.json();

    ConnectTODb();
    const res = await userModel.create({
      firstname,
      lastname,
      username,
      email,
      password,
      age,
    });

    if (res) {
      return Response.json(
        { message: "user created", user: res },
        { status: 201 }
      );
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    ConnectTODb();
    const res = await userModel.find();

    if (res) {
      return Response.json({ users: res }, { status: 200 });
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
