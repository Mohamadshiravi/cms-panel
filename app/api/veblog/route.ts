import ConnectTODb from "@/DB/connect-to-DB";
import veblogModel from "@/models/veblog";

export async function POST(req: Request) {
  try {
    const { title, body, category } = await req.json();

    ConnectTODb();
    const res = await veblogModel.create({
      title,
      category,
      body,
      desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکهع ",
      views: Math.floor(Math.random() * 100),
    });

    if (res) {
      return Response.json(
        { message: "veblog created", veblog: res },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);

    return Response.json({ message: "server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    ConnectTODb();
    const res = await veblogModel.find({}, "-__v");

    if (res) {
      return Response.json({ veblogs: res }, { status: 200 });
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
