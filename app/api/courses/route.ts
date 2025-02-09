import ConnectTODb from "@/DB/connect-to-DB";
import courseModel from "@/models/course";

export async function POST(req: Request) {
  try {
    const { title, price, category, desc } = await req.json();

    ConnectTODb();
    const res = await courseModel.create({
      title,
      price,
      category,
      desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکهع ",
      registersCount: Math.floor(Math.random() * 10),
    });

    if (res) {
      return Response.json(
        { message: "course created", course: res },
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
    const res = await courseModel.find({}, "-__v");
    console.log(res);

    if (res) {
      return Response.json({ courses: res }, { status: 200 });
    }
  } catch (error) {
    console.log(error);

    return Response.json({ message: "server error" }, { status: 500 });
  }
}
