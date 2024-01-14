import {Dispatch, SetStateAction} from 'react';
import Alert from 'react-bootstrap/Alert';
import {IError} from "../interfaces";
import {Button, Form} from "react-bootstrap";

interface IAlertProps {
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
    errors: IError[]
}

function AlertDismissibleExample({show, setShow, errors}: IAlertProps) {

    return (
        <div className="fixed-top">
            {show && errors.length>0 && <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Edit Error</Alert.Heading>
                <p>
                    {errors.map(error => error.msg)}
                </p>
            </Alert>
            }
        </div>
    )
}

export default AlertDismissibleExample;