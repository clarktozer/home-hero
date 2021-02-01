import { RootState } from "../../reducer";

export const getViewer = ({ app }: RootState) => app.viewer;
