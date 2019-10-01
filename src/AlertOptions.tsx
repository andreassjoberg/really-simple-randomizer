import React from "react";
import { AlertComponentPropsWithStyle, AlertProviderProps, positions } from "react-alert";

const AlertTemplate: React.FC<AlertComponentPropsWithStyle> = ({ message, options, style, close }) => {
    const color =
        options.type === "info"
            ? "info"
            : options.type === "success"
            ? "success"
            : options.type === "error"
            ? "danger"
            : "";

    return (
        <aside className={`bg-${color} fixed-top py-2 shadow text-center`} style={{ width: "100vw" }}>
            {message}
            <button type="button" className="close text-white mr-3" onClick={close}>
                <span aria-hidden="true">&times;</span>
            </button>
        </aside>
    );
};

const AlertOptions: AlertProviderProps = {
    template: AlertTemplate,
    timeout: 5000,
    position: positions.TOP_LEFT,
    containerStyle: { zIndex: 1031 }
};

export default AlertOptions;
