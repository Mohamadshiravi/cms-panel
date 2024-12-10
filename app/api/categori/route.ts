import ConnectTODb from "@/DB/connect-to-DB";
import categoriModel from "@/models/categori";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    ConnectTODb();
    const res = await categoriModel.create({
      name,
    });

    if (res) {
      return Response.json(
        { message: "categori created", course: res },
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
    const res = await categoriModel.find();

    if (res) {
      return Response.json({ categories: res }, { status: 200 });
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
