import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import Movie from "./models/Movie";
import User from "./models/User";
import bodyParser from "body-parser";

mongoose
    .connect("mongodb://admin:admin@it2810-55.idi.ntnu.no:27017/it2810?authSource=admin", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        const app = express();
        const jsonParser = bodyParser.json()
        app.use(
            cors({
                origin: 'http://localhost:3000',
                credentials: true,
            })
        );

        // Henter filmer, filtrert basert på queries
        app.get("/api/movies/", async (req, res, e) => {
            try {
                const genre = req.query.genre as string;
                const title = req.query.title as string;
                let minrate: number = 0.0;
                let maxrate: number = 10.0;

                const temp_minrate = req.query.minrate as string;
                if (temp_minrate !== "") {
                    minrate = Number(temp_minrate);
                }
                const temp_maxrate = req.query.maxrate as string;
                if (temp_maxrate !== "") {
                    maxrate = Number(temp_maxrate);
                }

                let order: number = -1;
                let sortby: string = "title";

                const temp_sortby = req.query.sortby as string;
                if (temp_sortby !== "") {
                    sortby = temp_sortby;
                }

                const temp_order = req.query.order as string;
                if (temp_order !== "") {
                    if(temp_order == "true") {
                        order = -1;
                    } else {
                        order = 1;
                    }
                }
                if(sortby == "title" && order == 1) {
                    order = -1;
                } else if(sortby == "title" && order == -1) {
                    order = 1;
                }

                let minlen: number = 65;
                let maxlen: number = 230;

                const temp_minlen = req.query.minlen as string;
                if (temp_minlen !== "") {
                    minlen = Number(temp_minlen);
                }
                const temp_maxlen = req.query.maxlen as string;
                if (temp_maxlen !== "") {
                    maxlen = Number(temp_maxlen);
                }

                const pageNr = Number(req.query.pagenr as string);
                const movies = async () => {
                    if (genre !== "" && title !== "" && minrate !== null && maxrate !== null && minlen !== null && maxlen !== null) {
                        // Hvis sjanger og tittel er søkt på
                        return Movie.find({'genres': genre}).find({'title': {$regex: title, $options: "i"}})
                            .find({'imdbRating': {$gte: minrate, $lte: maxrate}}).find({
                                'duration': {
                                    $gte: minlen,
                                    $lte: maxlen
                                }
                            }).sort({[sortby]: order})
                            .skip(pageNr > 0 ? ((pageNr - 1) * 20) : 0).limit(20);
                    } else if (genre !== "") {
                        // Hvis bare sjanger er søkt på
                        return Movie.find({'genres': genre}).find({
                            'imdbRating': {
                                $gte: minrate,
                                $lte: maxrate
                            }
                        }).find({'duration': {$gte: minlen, $lte: maxlen}}).sort({[sortby]: order})
                            .skip(pageNr > 0 ? ((pageNr - 1) * 20) : 0).limit(20);
                    } else if (title !== "") {
                        // Hvis bare tittel er søkt på
                        return Movie.find({'title': {$regex: title, $options: "i"}}).find({
                            'imdbRating': {
                                $gte: minrate,
                                $lte: maxrate
                            }
                        }).find({'duration': {$gte: minlen, $lte: maxlen}}).sort({[sortby]: order})
                            .skip(pageNr > 0 ? ((pageNr - 1) * 20) : 0).limit(20);
                    } else if (minrate !== 1.0 && maxrate == 10.0) {
                        return Movie.find({'imdbRating': {$gte: minrate}}).sort({[sortby]: order})
                            .find({
                                'duration': {
                                    $gte: minlen,
                                    $lte: maxlen
                                }
                            }).skip(pageNr > 0 ? ((pageNr - 1) * 20) : 0).limit(20);
                    } else if (maxrate !== 10.0 && minrate == 1.0) {
                        return Movie.find({'imdbRating': {$lte: maxrate}}).sort({[sortby]: order})
                            .find({
                                'duration': {
                                    $gte: minlen,
                                    $lte: maxlen
                                }
                            }).skip(pageNr > 0 ? ((pageNr - 1) * 20) : 0).limit(20);
                    } else if (minlen !== 0 && maxlen == 300) {
                        return Movie.find({'imdbRating': {$gte: minrate}}).sort({[sortby]: order})
                            .find({
                                'duration': {
                                    $gte: minlen,
                                    $lte: maxlen
                                }
                            }).skip(pageNr > 0 ? ((pageNr - 1) * 20) : 0).limit(20);
                    } else if (minlen !== 0 && maxlen == 300) {
                        return Movie.find({'imdbRating': {$lte: maxrate}}).sort({[sortby]: order})
                            .find({
                                'duration': {
                                    $gte: minlen,
                                    $lte: maxlen
                                }
                            }).skip(pageNr > 0 ? ((pageNr - 1) * 20) : 0).limit(20);
                    } else {
                        // Hvis ingen kriterer er søkt på
                        return Movie.find().find({'imdbRating': {$gte: minrate, $lte: maxrate}}).sort({[sortby]: order})
                            .find({
                                'duration': {
                                    $gte: minlen,
                                    $lte: maxlen
                                }
                            }).skip(pageNr > 0 ? ((pageNr - 1) * 20) : 0).limit(20);
                    }
                }
                movies().then(movieList => {
                    if (movieList.length === 0) {
                        res.status(404).send({error: 'No movies'})
                    } else {
                        res.status(200).send(movieList)
                    }
                });
            } catch {
                res.status(404).send({error: "Couldn't fetch movies"})
            }
        });

        // Henter filmene fra watchlist til en bruker
        app.get("/api/user", async (req, res, e) => {
            try {
                const userName = req.query.userName as string;
                const password = req.query.password as string;
                const user = await User.findOne({'userName': userName, 'password': password}).exec();
                res.status(200).send(user.movies);
            } catch {
                res.status(404).json({error: "Couldn't fetch movies"})
            }
        });

        // Legger til en bruker
        app.post("/api/user/add", jsonParser, async (req, res) => {
            const userName = req.body.userName;
            const password = req.body.password;
            const movies = req.body.movies;
            const user = new User({'userName': userName, 'password': password, 'movies': movies});
            console.log(user);
            try {
                await user.save();
                res.status(200).send({message: "User added"})
            } catch {
                res.status(404).send({error: "Could not add user"})
            }
        });

        // Legger til en film i brukerens watchlist
        app.post("/api/user/addMovie", jsonParser, async (req, res) => {
            const userName = req.body.userName;
            const movieId = req.body.movieId;
            try {
                const user = await User.findOne({'userName': userName}).exec();
                const movie = await Movie.findOne({'_id': movieId}).exec();
                movie.watches++;
                user.movies.push(movieId);
                await user.save();
                await movie.save();
                res.status(200).send({message: "Movie added to watchlist"});
            } catch {
                res.status(404).send({error: "Could not add to watchlist"});
            }
        });
        app.post("/api/user/removeMovie", jsonParser, async (req, res) => {
            const movieId = req.body.movieId;
            const userName = req.body.userName;
            try {
                const user = await User.findOne({'userName': userName}).exec();
                const movie = await Movie.findOne({'_id': movieId}).exec();
                movie.watches--;
                if (user.movies.includes(movieId)) {
                    user.movies = user.movies.filter(movie => movie !== movieId);
                    await movie.save();
                    await user.save();
                    res.status(200).send("Movie removed from watchlist");
                } else {
                    res.status(404).send({error: "Movie not in watchlist"});
                }
            } catch {
                res.status(404).send({error: "Could not remove from watchlist"});
            }

        })
        app.use(express.json());
        app.listen(5000, () => {
            console.log("Server has started!");
        });
    });