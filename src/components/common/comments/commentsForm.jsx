import React, { useEffect, useState } from "react";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";

const CommentsForm = ({ users, onSubmit }) => {
    const [data, setData] = useState({ selectedUser: "", content: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        setData({ selectedUser: "", content: "" });
    };

    const validateConfig = {
        selectedUser: {
            isRequired: { message: "Выберите пользователя" },
        },
        content: {
            isRequired: { message: "Введите свой комментарий" },
        },
    };

    const validate = () => {
        const errors = validator(data, validateConfig);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
            <SelectField
                defaultOption="Выберите пользователя"
                name="selectedUser"
                options={
                    users &&
                    users.map((user) => ({
                        name: user.name,
                        value: user._id,
                    }))
                }
                value={data.selectedUser}
                error={errors.selectedUser}
                onChange={handleChange}
            />
            <TextAreaField
                label="Сообщение"
                name="content"
                value={data.content}
                error={errors.content}
                onChange={handleChange}
            />
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Отправить
            </button>
        </form>
    );
};

CommentsForm.propTypes = {
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onSubmit: PropTypes.func,
};

export default CommentsForm;
