import React from "react";
import { Table } from "reactstrap";
import { currentArticle, quantiteState } from "../../variables/state";
import { useRecoilValue } from "recoil";

const Recap = () => {
	const article = useRecoilValue(currentArticle);
	const quantite = useRecoilValue(quantiteState);

	return (
		<>
			<Table>
				<tbody>
					<tr>
						<th scope="row">Nom article</th>
						<td>{article.prd_nom}</td>
					</tr>
					<tr>
						<th scope="row"> Montant unitaire</th>
						<td>{article.magst_prix}</td>
					</tr>
					<tr>
						<th scope="row">Quantité total</th>
						<td>{quantite}</td>
					</tr>
					<tr>
						<th scope="row">Montant total</th>
						<td>
							{isNaN(article.magst_prix * quantite)
								? 0
								: article.magst_prix * quantite}
						</td>
					</tr>
				</tbody>
			</Table>
		</>
	);
};

export default Recap;
