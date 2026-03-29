import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Spinner, Card, Text, Box, Input, Field, Stack, NativeSelect, Button, Textarea, } from "@chakra-ui/react";
import { getAllRecords, insertNewMeishiRecord, } from "../lib/supabaseCRUDFunctions";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export const RegisterMeishi = () => {
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [skills, setSkills] = useState([]);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, control, } = useForm({
        defaultValues: {
            user_id: "",
            name: "",
            description: "",
            skill: "",
            github_id: "",
            qiita_id: "",
            x_id: "",
        },
        mode: "onBlur",
    });
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const getSkills = async () => {
        try {
            const skill = await getAllRecords("skills");
            setSkills(skill);
            if (loading) {
                setLoading(!loading);
            }
        }
        catch (error) {
            console.error("Error fetching records:", error);
        }
    };
    const onSubmit = async (newRecord) => {
        try {
            setRegistering(true);
            //await sleep(1000);
            await insertNewMeishiRecord(newRecord);
            navigate("/");
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setRegistering(false);
        }
    };
    useEffect(() => {
        getSkills();
    }, []);
    if (loading) {
        return (_jsx(_Fragment, { children: _jsx(Spinner, {}) }));
    }
    else {
        return (_jsxs(_Fragment, { children: [_jsx(Box, { children: _jsx(Text, { fontWeight: "semibold", fontSize: "xl", textAlign: "center", "data-testid": "title", children: "\u65B0\u898F\u540D\u523A\u767B\u9332" }) }), _jsx(Card.Root, { children: _jsx(Card.Body, { children: _jsxs(Stack, { gap: 4, children: [_jsxs(Field.Root, { required: true, invalid: !!errors.user_id, children: [_jsxs(Field.Label, { htmlFor: "user_id", children: ["ID", _jsx(Field.RequiredIndicator, {})] }), _jsx(Input, { "data-testid": "user_id", id: "user_id", ...register("user_id", {
                                                validate: {
                                                    BlankCheck: (value) => value.trim() !== "" || "IDの入力は必須です",
                                                    PatternCheck: (value) => /^[a-zA-Z]+(-[a-zA-Z]+)*$/.test(value) ||
                                                        "ハイフンと英語文字列のみです(連続ハイフン不可)",
                                                },
                                            }) }), _jsx(Field.ErrorText, { "data-testid": "user_id_error", children: errors.user_id?.message })] }), _jsxs(Field.Root, { required: true, invalid: !!errors.name, children: [_jsxs(Field.Label, { htmlFor: "name", children: ["\u304A\u540D\u524D", _jsx(Field.RequiredIndicator, {})] }), _jsx(Input, { "data-testid": "name", id: "name", ...register("name", {
                                                validate: (value) => value.trim() !== "" || "名前の入力は必須です",
                                            }) }), _jsx(Field.ErrorText, { "data-testid": "name_error", children: errors.name?.message })] }), _jsxs(Field.Root, { required: true, invalid: !!errors.description, children: [_jsxs(Field.Label, { htmlFor: "description", children: ["\u81EA\u5DF1\u7D39\u4ECB", _jsx(Field.RequiredIndicator, {})] }), _jsx(Textarea, { "data-testid": "description", id: "description", rows: 5, placeholder: "<h1>HTML\u30BF\u30B0\u3082\u4F7F\u3048\u307E\u3059</h1>", ...register("description", {
                                                validate: (value) => value.trim() !== "" || "自己紹介の入力は必須です",
                                            }) }), _jsx(Field.ErrorText, { "data-testid": "description_error", children: errors.description?.message })] }), _jsxs(Field.Root, { required: true, invalid: !!errors.skill, children: [_jsxs(Field.Label, { htmlFor: "skill", children: ["\u597D\u304D\u306A\u6280\u8853", _jsx(Field.RequiredIndicator, {})] }), _jsx(Controller, { name: "skill", control: control, rules: {
                                                validate: (value) => String(value).trim() !== "" ||
                                                    "好きな技術の選択は必須です",
                                            }, render: ({ field }) => (_jsxs(NativeSelect.Root, { children: [_jsxs(NativeSelect.Field, { "data-testid": "skill", ...field, children: [_jsx("option", { value: "", children: "Select Option" }), skills.map((record) => (_jsx("option", { value: record.id, children: record.name })))] }), _jsx(NativeSelect.Indicator, {})] })) }), _jsx(Field.ErrorText, { "data-testid": "skill_error", children: errors.skill?.message })] }), _jsxs(Field.Root, { children: [_jsx(Field.Label, { htmlFor: "github_id", children: "Github ID" }), _jsx(Input, { "data-testid": "github_id", id: "github_id", ...register("github_id") })] }), _jsxs(Field.Root, { children: [_jsx(Field.Label, { htmlFor: "qiita_id", children: "Qiita ID" }), _jsx(Input, { "data-testid": "qiita_id", id: "qiita_id", ...register("qiita_id") })] }), _jsxs(Field.Root, { children: [_jsx(Field.Label, { htmlFor: "x_id", children: "X ID" }), _jsx(Input, { "data-testid": "x_id", id: "x_id", ...register("x_id") })] }), _jsx(Button, { onClick: handleSubmit(onSubmit), loading: registering, colorPalette: "teal", variant: "solid", children: "\u767B\u9332" }), _jsx(Button, { onClick: () => navigate("/"), colorPalette: "teal", variant: "solid", children: "\u623B\u308B" })] }) }) })] }));
    }
};
