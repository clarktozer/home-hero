import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Chip,
    createStyles,
    Grid,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { getViewer } from "../../state/features";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: 24
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.secondary
        },
        media: {
            height: 0,
            paddingTop: "100px" // 16:9
        },
        large: {
            width: theme.spacing(10),
            height: theme.spacing(10)
        }
    })
);

export const User: FC = () => {
    const viewer = useSelector(getViewer);
    const classes = useStyles();

    return viewer ? (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card variant="outlined" square>
                        <CardHeader
                            avatar={
                                <Avatar
                                    className={classes.large}
                                    alt={viewer.name}
                                    src={viewer.avatar}
                                />
                            }
                            title={
                                <Typography gutterBottom variant="h5">
                                    {viewer.name}
                                </Typography>
                            }
                            subheader={viewer.email}
                        />
                        <CardContent>
                            <Chip label="Primary clickable" color="primary" />
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                gutterBottom
                            >
                                Temporibus sint fugiat ipsum iusto dignissimos
                                qui fuga molestiae. Maiores et cum numquam
                                possimus occaecati est adipisci. Commodi
                                quibusdam et molestiae rerum beatae nulla
                                minima. Ducimus dolorum temporibus tenetur.
                                Minima nemo fugit hic totam hic quos ut
                                praesentium. Eos ea sit cum necessitatibus.
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                gutterBottom
                            >
                                Temporibus sint fugiat ipsum iusto dignissimos
                                qui fuga molestiae. Maiores et cum numquam
                                possimus occaecati est adipisci. Commodi
                                quibusdam et molestiae rerum beatae nulla
                                minima. Ducimus dolorum temporibus tenetur.
                                Minima nemo fugit hic totam hic quos ut
                                praesentium. Eos ea sit cum necessitatibus.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        gutterBottom
                    >
                        Temporibus sint fugiat ipsum iusto dignissimos qui fuga
                        molestiae. Maiores et cum numquam possimus occaecati est
                        adipisci. Commodi quibusdam et molestiae rerum beatae
                        nulla minima. Ducimus dolorum temporibus tenetur. Minima
                        nemo fugit hic totam hic quos ut praesentium. Eos ea sit
                        cum necessitatibus.
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        gutterBottom
                    >
                        Temporibus sint fugiat ipsum iusto dignissimos qui fuga
                        molestiae. Maiores et cum numquam possimus occaecati est
                        adipisci. Commodi quibusdam et molestiae rerum beatae
                        nulla minima. Ducimus dolorum temporibus tenetur. Minima
                        nemo fugit hic totam hic quos ut praesentium. Eos ea sit
                        cum necessitatibus.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    ) : null;
};
