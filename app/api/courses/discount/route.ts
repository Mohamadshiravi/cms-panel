import ConnectTODb from "@/DB/connect-to-DB";
import courseModel from "@/models/courses";

export async function PUT(req: Request) {
  const { precent } = await req.json();
  try {
    ConnectTODb();
    const res = await courseModel.updateMany(
      {},
      { $set: { discount: precent } }
    );

    const courses = await courseModel
      .find({}, "-__v")
      .populate("categori", "-__v");

    if (res) {
      return Response.json(
        { message: "course updated", courses },
        { status: 200 }
      );
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
