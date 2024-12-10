import ConnectTODb from "@/DB/connect-to-DB";
import courseModel from "@/models/courses";

export async function POST(req: Request) {
  try {
    const { title, price, categori, desc } = await req.json();

    ConnectTODb();
    const res = await courseModel.create({
      title,
      price,
      categori,
      desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکهع ",
      registersCount: Math.floor(Math.random() * 10),
    });

    const courses = await courseModel
      .findOne({ _id: res._id })
      .populate("categori", "-__v");

    if (res) {
      return Response.json(
        { message: "course created", course: courses },
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
    const res = await courseModel.find().populate("categori", "-__v -_id");

    if (res) {
      return Response.json({ courses: res }, { status: 200 });
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
