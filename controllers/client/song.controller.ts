import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";

// [GET] /songs/:slug
export const index = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const topic = await Topic.findOne({
    slug: slug,
    status: "active",
    deleted: false,
  });

  const songs = await Song.find({
    topicId: topic._id,
    status: "active",
    deleted: false,
  }).select("avatar title slug singerId like ");

  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false,
    }).select("fullName");
    song['infoSinger'] = infoSinger;
  }
  console.log(songs);
  
  res.render("client/pages/songs/list", {
    pageTitle: topic.title,
    songs: songs,
  });
};
