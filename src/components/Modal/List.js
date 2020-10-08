import React from "react";
import { currentArticle, listeArticles } from "../../variables/state";
import { useSetRecoilState, useRecoilState } from "recoil";
import mockList from "../../variables/articlesList";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Input } from 'reactstrap'
import matchSorter from 'match-sorter'
import { useCookies  } from "react-cookie";

let i = 0;

const List = () => {
    const [liste, setListe] = useRecoilState(listeArticles);
    const setCurrentArticle = useSetRecoilState(currentArticle);
    const [searchValue, setSearchValue] = React.useState("");
    const [premaList, setpremaList] = React.useState([]);
    const [cookies, ] = useCookies(['Token']);

    React.useEffect(() => {
        mockList(setpremaList, cookies);
    }, [cookies])
    console.log(cookies)
    React.useEffect(() => {
        setListe(premaList);
    }, [setListe, premaList]);

    const [modal, setModal] = React.useState(false);

    const toggle = () => setModal(!modal);

    const selection = (article) => {
        setCurrentArticle(article);
    };

    const filtering = (text) => {

        if (text.trim().length > 0) {
            const tmp = matchSorter(premaList, text, {keys: ['prd_nom']})
            
            if (tmp.length > 0) {
                setListe(tmp);
            } else {
                setListe(premaList);
            }
        } else {
            setListe(premaList);
        }

        setSearchValue(text);
    };

    return (
        <div style={{ margin: '5px' }}>
            <Button color="danger" onClick={toggle}>Liste article</Button>
            <Modal isOpen={modal} toggle={toggle} style={{
                position: 'absolute',
                top: 0,
                height: '0%',
                width: '90%'
            }}>
                <ModalHeader toggle={toggle}>
                    <span style={{color: "black", fontSize: 20}}>Liste articles</span>
                    <br />
                    50 premiers articles...
                </ModalHeader>
                <ModalBody>
                    <Input
                        type="text"
                        bssize="sm"
                        className="text-primary"
                        autoFocus={true}
                        value={searchValue}
                        onChange={(e) => filtering(e.target.value)}
                        placeholder="Filtre de recherche"
                    />
                    <br />
                    <ListGroup>
                        {liste.slice(0, 50).map((el) => {
                            i++;
                            return (
                                <div key={el.prd_codebarre + i}>
                                    <ListGroupItem color="primary">{el.prd_nom}</ListGroupItem>
                                    <Button block={true} size="sm" color="warning" onClick={() => {
                                        selection(el);
                                        setModal(!modal)
                                    }}>Choose</Button>
                                    <br />
                                </div>
                            );
                        })}
                    </ListGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Ferme</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default List;