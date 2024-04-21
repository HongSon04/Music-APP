import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";
import { log } from "console";

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

  res.render("client/pages/songs/list", {
    pageTitle: topic.title,
    songs: songs,
  });
};

// [GET] /songs/detail/:slug
export const detail = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const song = await Song.findOne({
    slug: slug,
    deleted: false,
  });

  const infoSinger = await Singer.findOne({
    _id: song.singerId,
    status: "active",
    deleted: false,
  }).select("fullName");

  const topic = await Topic.findOne({
    _id: song.topicId,
    status: "active",
    deleted: false,
  }).select("title");

  const favoriteSong = await FavoriteSong.findOne({
    songId: song._id,
  });

  song['isFavorite'] = favoriteSong ? true : false;

  res.render("client/pages/songs/detail", {
    pageTitle: song.title,
    song: song,
    topic: topic,
    singer: infoSinger,
  });
};

// [PATCH] /songs/like/:type/:id
export const like = async (req: Request, res: Response) => {
  const id = req.params.id;
  const typeLike = req.params.type;
  const song = await Song.findOne({
    _id: id,
    status: "active",
    deleted: false,
  });

  const newLike: number = typeLike === "like" ? song.like + 1 : song.like - 1;

  await Song.updateOne(
    { _id: song.id }, {
    like: newLike
  });

  res.json({ code: 200, like: newLike });
};

export const favorite = async (req: Request, res: Response) => {
  const id = req.params.id;
  const typeFavorite = req.params.typeFavorite;
  switch (typeFavorite) {
    case "favorite":
      const exitstFavoriteSong = await FavoriteSong.findOne({
        songId: id,
      });
      if (!exitstFavoriteSong) {
        const record = new FavoriteSong({
          userId: "1",
          songId: id,
        });
        await record.save();
        res.json({ code: 200, message: "Thành Công" });
      }
      break;
    case "unfavorite":
      await FavoriteSong.deleteOne({
        songId: id,
      });
      break;
    default:
      res.json({ code: 400, message: "Bad request" });

      return;
  }
}