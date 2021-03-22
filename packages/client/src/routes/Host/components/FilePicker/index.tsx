import { CircularProgress, Icon, Paper } from "@material-ui/core";
import classnames from "classnames";
import { useSnackbar } from "notistack";
import React, { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { getBase64Value } from "../../../../utils";
import { useStyles } from "./style";
import { FilePickerProps } from "./types";

export const FilePicker: FC<FilePickerProps> = ({ onChange, value, error }) => {
    const classes = useStyles();
    const maxSize = 1048576;
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setLoading] = useState(false);

    const onDrop = async (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setLoading(true);
            const file = acceptedFiles[0];
            const image = await getBase64Value(file);
            onChange(image);
            setLoading(false);
        }
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        fileRejections
    } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop,
        maxSize,
        maxFiles: 1
    });

    useEffect(() => {
        if (fileRejections.length > 0) {
            const isFileTooLarge = fileRejections[0].file.size > maxSize;

            if (isFileTooLarge) {
                enqueueSnackbar(
                    "You're only able to upload valid images files of under 1MB in size!",
                    {
                        variant: "error"
                    }
                );
            }
        }
    }, [fileRejections, enqueueSnackbar]);

    return (
        <div className={classes.imagePickerContainer} {...getRootProps()}>
            <input {...getInputProps()} />
            <Paper
                className={classnames(classes.imagePicker, {
                    [classes.errorBorder]: error
                })}
                elevation={0}
            >
                {!value && (
                    <div className={classes.addImage}>
                        {isDragActive ? (
                            <Icon>add_circle</Icon>
                        ) : isLoading ? (
                            <CircularProgress size={20} />
                        ) : (
                            <Icon>add</Icon>
                        )}
                    </div>
                )}
                {value && (
                    <img className={classes.image} src={value} alt="Listing" />
                )}
            </Paper>
        </div>
    );
};
