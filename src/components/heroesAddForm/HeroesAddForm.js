import { useHttp } from '../../hooks/http.hook';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import './HeroesAddForm.scss';
import { heroCreated } from '../heroesList/heroesSlice';
import { useCreateHeroMutation } from '../../api/apiSlice';

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const { request } = useHttp();

    const [ createHero, {isLoading} ] = useCreateHeroMutation();

    return (
        <Formik 
        initialValues = {{
            id: uuidv4(),
            name: '',
            description: '',
            element: '',
        }}
        validationSchema = {Yup.object({
            name: Yup.string().min(2, 'Минимум 2 символа').required('Обязательное поле'),
            description: Yup.string().min(10, 'Не менее 10 символов'),
            element: Yup.string().required('Обязательное поле'),
        })}
        onSubmit = {(newHero, {resetForm}) => {
            // request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            // .then(res => console.log(res, 'Отправка успешна'))
            // .then(dispatch(heroCreated(newHero)))
            // .catch(err => console.log(err));
            createHero(newHero).unwrap();
            resetForm();
        }}
        >
        <Form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <Field 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
                <ErrorMessage className="error" name="name" component="div"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <Field
                    as="textarea"
                    required
                    name="description" 
                    className="form-control" 
                    id="description" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
                <ErrorMessage className="error" name="description" component="div"/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <Field
                    as="select" 
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </Field>
                <ErrorMessage className="error" name="element" component="div"/> 
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </Form>
    </Formik>
    )
}

export default HeroesAddForm;