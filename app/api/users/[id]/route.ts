import ConnectTODb from "@/DB/connect-to-DB";
import userModel from "@/models/user";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    ConnectTODb();
    const res = await userModel.findOneAndDelete({ _id: params.id });

    if (res) {
      return Response.json(
        { message: "user deleted", id: res._id },
        { status: 200 }
      );
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
