const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "../user.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
});

const proto = grpc.loadPackageDefinition(packageDefinition).user;

const client = new proto.UserService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

console.log("Mengirim request ke Go Server menggunakan Node.js...");

client.GetUserProfile({ user_id: 1 }, (err, response) => {
    if (err) {
        console.error("Error:", err.message);
        return;
    }

    console.log(
        `Respon dari Server -> Nama: ${response.name}, Email: ${response.email}`
    );
});