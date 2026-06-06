import express from "express";
import dotenv from "dotenv";
import { contentModel, linkModel, userModel } from "./db";
dotenv.config();
import jwt from "jsonwebtoken";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";

const app = express();

app.use(express.json())
app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await userModel.create({
            username: username,
            password: password
        })

        res.status(201).json({
            message: "User signed up successfully",
            user: user
        })
    } catch (error) {
        res.status(411).json({
            message: "User already exists",
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await userModel.findOne({
            username: username,
            password: password
        });

        if (!user) {
            res.status(403).json({
                message: "Invalid username or password"
            });
            return;
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET as string);

        res.status(200).json({
            message: "Signed in successfully",
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    await contentModel.create({
        title: title,
        type: type,
        link: link,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })

    return res.status(201).json({
        message: "Content created successfully"
    })
})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await contentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        message: "all content",
        content
    })
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    await contentModel.deleteMany({
        contentId,
        // @ts-ignore
        userId: req.userId
    })

    res.json({
        message: "Content Deleted"
    })
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existingLink = await linkModel.findOne({
            // @ts-ignore
            userId: req.userId
        });

        if (existingLink) {
            return res.json({
                hash: existingLink.hash
            })
        }
        const hash = random(10)
        await linkModel.create({
            // @ts-ignore
            userId: req.userId,
            hash: hash
        })

        res.json({
            messagge: "/share/" + hash
        })


    } else {
        await linkModel.deleteOne({
            // @ts-ignore
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }


})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await linkModel.findOne({
        hash: hash
    });

    if (!link) {
        res.status(411).json({
            message: "Incorrect Link"
        })
        return;
    }

    const content = await contentModel.find({
        userId: link.userId
    })

    const user = await userModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "User not found with this link"
        })
        return;
    }

    res.json({
        username: user?.username,
        content: content
    })
});


app.listen(3000);