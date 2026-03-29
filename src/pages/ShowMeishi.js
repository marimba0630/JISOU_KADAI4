import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { getSpecifyMeishiRecord } from "../lib/supabaseCRUDFunctions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Card, Text, Box, Stack, IconButton, Center, Button, } from "@chakra-ui/react";
import { FaGithubSquare, FaTwitterSquare } from "react-icons/fa";
import { SiQiita } from "react-icons/si";
export const ShowMeishi = () => {
    const { id } = useParams();
    const [meishiRecord, setMeishiRecord] = useState();
    const [loadingFlag, setLoadingFlag] = useState(true);
    const navigate = useNavigate();
    const getMeishiRecord = async () => {
        try {
            const fetchedRecord = await getSpecifyMeishiRecord(id);
            setMeishiRecord(fetchedRecord);
            if (loadingFlag) {
                setLoadingFlag(false);
            }
        }
        catch (error) {
            console.error("Error fetching records:", error);
        }
    };
    useEffect(() => {
        getMeishiRecord();
    }, []);
    if (loadingFlag) {
        return _jsx(Spinner, {});
    }
    else {
        return (_jsxs(_Fragment, { children: [_jsx(Center, { minH: "50vh", children: _jsx(Card.Root, { maxW: "260px", borderRadius: "lg", boxShadow: "md", children: _jsx(Card.Body, { children: _jsxs(Stack, { children: [_jsx(Card.Title, { "data-testid": "name", children: meishiRecord?.user_name }), _jsxs(Box, { children: [_jsx(Text, { fontWeight: "semibold", children: "\u81EA\u5DF1\u7D39\u4ECB" }), _jsx(Text, { "data-testid": "description", dangerouslySetInnerHTML: {
                                                    __html: meishiRecord?.description ?? "",
                                                } })] }), _jsxs(Box, { children: [_jsx(Text, { fontWeight: "semibold", children: "\u597D\u304D\u306A\u6280\u8853" }), (meishiRecord?.skills ?? []).map((skill_name, key) => (_jsx(Text, { fontSize: "sm", "data-testid": "skill", children: skill_name }, key)))] }), _jsxs(Stack, { direction: "row", justify: "center", children: [_jsx(IconButton, { asChild: true, "aria-label": "github", variant: "ghost", "data-testid": "githubid", children: _jsx("a", { href: meishiRecord?.github_url, target: "_blank", children: _jsx(FaGithubSquare, {}) }) }), _jsx(IconButton, { asChild: true, "aria-label": "qiita", variant: "ghost", "data-testid": "qiitaid", children: _jsx("a", { href: meishiRecord?.qiita_url, target: "_blank", children: _jsx(SiQiita, {}) }) }), _jsx(IconButton, { asChild: true, "aria-label": "x", variant: "ghost", "data-testid": "xid", children: _jsx("a", { href: meishiRecord?.x_url, target: "_blank", children: _jsx(FaTwitterSquare, {}) }) })] })] }) }) }) }), _jsx(Stack, { children: _jsx(Button, { "data-testid": "back", colorPalette: "teal", w: "200px", mx: "auto", onClick: () => navigate("/"), children: "\u623B\u308B" }) })] }));
    }
};
