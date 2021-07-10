const express = require('express');
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://thaison247:1234@learn-it.5sbjt.mongodb.net/learn-it?retryWrites=true&w=majority`,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        )

        console.log("MongoDB connected")
    } catch(error) {
        console.log(err.message);
        process.exit(1);
    }
}

connectDB();

const app = express();

app.get('/', (req, res) => res.send('Hello world'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));