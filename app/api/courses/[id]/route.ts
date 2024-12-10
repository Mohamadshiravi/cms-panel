import ConnectTODb from "@/DB/connect-to-DB";
import courseModel from "@/models/courses";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    ConnectTODb();
    const res = await courseModel.findOneAndDelete({ _id: params.id });

    if (res) {
      return Response.json(
        { message: "course deleted", id: res._id },
        { status: 200 }
      );
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
