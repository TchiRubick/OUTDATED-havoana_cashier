import React from "react";
import { DropdownItem, Input } from "reactstrap";
import { currentArticle, listeArticles } from "../../variables/state";
import { useSetRecoilState, useRecoilState } from "recoil";
import { mocklist } from "../../variables/articlesList";

const List = () => {
	const [liste, setListe] = useRecoilState(listeArticles);
	const setCurrentArticle = useSetRecoilState(currentArticle);
	const [searchValue, setSearchValue] = React.useState("");

	React.useEffect(() => {
		mocklist(setListe);
	}, [setListe]);

	const selection = (article) => {
		setCurrentArticle(article);
	};

	const filtering = (text) => {
		let lenval = text.length;
		let res = [];

		if (lenval > 0) {
			liste.find((el) => {
				if (
					el.prd_nom.trim().toLowerCase().substring(0, lenval) ===
					text.replace(/^\s+/g, "").toLowerCase()
				) {
					res.push(el);
				}
				return false;
			});
			setListe(res);
		} else {
			mocklist(setListe);
		}

		setSearchValue(text);
	};

	return (
		<>
			<DropdownItem header>
				<Input
					type="text"
					bssize="sm"
					className="text-primary"
					autoFocus={true}
					value={searchValue}
					onChange={(e) => filtering(e.target.value)}
				/>
			</DropdownItem>
			<DropdownItem divider />
			{liste.map((el) => {
				return (
					<DropdownItem
						className="text-primary"
						onClick={() => selection(el)}
						key={el.prd_codebarre}
					>
						{el.prd_nom}
					</DropdownItem>
				);
			})}
		</>
	);
};

export default List;
