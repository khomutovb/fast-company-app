import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import api from "../../api";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import PropTypes from "prop-types";

const UpdateForm = () => {
    const params = useParams();
    const { userId } = params;
    const [data, setData] = useState();
    const [qualities, setQualities] = useState({});
    const [professions, setProfessions] = useState();
    const [errors, setErrors] = useState({});
    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((data) => setData(data));
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    const handleChange = (target) => {
        let value = target.value;
        if (target.name === "profession") {
            Object.entries(professions).map(([, item]) => {
                if (item._id === target.value) {
                    value = item;
                }
            });
        }
        if (target.name === "qualities") {
            value = [];
            Object.entries(qualities).map(([, item]) => {
                target.value.map((quality) => {
                    if (quality.value === item._id) {
                        value.push(item);
                    }
                });
            });
        }
        setData((prevState) => ({ ...prevState, [target.name]: value }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения",
            },
        },
        email: {
            isRequired: {
                message: "Электронная почта обязатальна для заполнения",
            },
            isEmail: {
                message: "Email введен некорректно",
            },
        },
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        history.push(`/users/${userId}`);
        api.users.update(userId, data);
    };
    const handleBack = () => {
        history.goBack();
    };
    return (
        <div className="container-fluid col-md-6 mt-4">
            <button
                className="btn btn-primary mb-4"
                onClick={handleBack}
                type="button"
            >
                Назад
            </button>
            <div className="shadow p-4">
                {data && professions ? (
                    <form action="" onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <SelectField
                            label="Выберите вашу профессию"
                            defaultOption="Choose..."
                            options={professions}
                            name="profession"
                            onChange={handleChange}
                            value={data.profession._id}
                            error={errors.profession}
                        />
                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" },
                            ]}
                            value={data.sex}
                            name="sex"
                            onChange={handleChange}
                            label="Выберите ваш пол"
                        />
                        <MultiSelectField
                            options={qualities}
                            onChange={handleChange}
                            value={data.qualities.map((qualitie) => ({
                                label: qualitie.name,
                                value: qualitie._id,
                            }))}
                            label="Выберите ваши качества"
                            name="qualities"
                        />
                        <button
                            className="btn btn-primary w-100 mx-auto"
                            type="submit"
                            disabled={!isValid}
                        >
                            Обновить
                        </button>
                    </form>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

UpdateForm.propTypes = {
    userId: PropTypes.string,
};
export default UpdateForm;
