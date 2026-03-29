import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { Button, Box, Text, Stack, Field, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export const App = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm({ defaultValues: { user_id: "" }, mode: "onBlur" });
    const navigater = useNavigate();
    const viewMeishi = (data) => {
        navigater(`/cards/${data.user_id}`);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Box, { children: _jsx(Text, { "data-testid": "title", fontWeight: "semibold", fontSize: "xl", textAlign: "center", children: "\u30C7\u30B8\u30BF\u30EB\u540D\u523A" }) }), _jsxs(Stack, { gap: 4, align: "center", children: [_jsxs(Field.Root, { alignItems: "center", required: true, invalid: !!errors.user_id, children: [_jsx(Field.Label, { htmlFor: "use_id", children: "\u30E6\u30FC\u30B6\u30FCID" }), _jsx(Input, { id: "user_id", "data-testid": "user_id", w: "200px", margin: "10px", ...register("user_id", {
                                    validate: (value) => value.trim() !== "" || "閲覧にはユーザーIDは必須です",
                                }) }), _jsx(Field.ErrorText, { "data-testid": "user_id_error", children: errors.user_id?.message })] }), _jsx(Button, { colorPalette: "teal", w: "150px", onClick: handleSubmit(viewMeishi), children: "\u540D\u523A\u691C\u7D22" }), _jsx(Button, { colorPalette: "teal", w: "150px", onClick: () => navigater("/cards/register"), children: "\u65B0\u898F\u767B\u9332\u306F\u3053\u3061\u3089" })] })] }));
};
