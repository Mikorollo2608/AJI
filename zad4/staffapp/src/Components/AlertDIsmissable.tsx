import {Dispatch, SetStateAction, useEffect} from 'react';
import Alert from 'react-bootstrap/Alert';
import {IError} from "../interfaces";

interface IAlertProps {
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
    errors: IError[]
}

function AlertDismissible({show, setShow, errors}: IAlertProps) {

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    return (
        <div className="fixed-top">
            {show && errors.length>0 && <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Edit Error</Alert.Heading>
                    {errors.map((error) => {return (
                        <p>{error.msg}</p>
                    )})}
            </Alert>
            }
        </div>
    )
}

export default AlertDismissible;