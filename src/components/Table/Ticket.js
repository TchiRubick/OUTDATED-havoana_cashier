import React from "react";
import { Table, Button } from "reactstrap";
import { panier, totalPanier } from "../../variables/state";
import { useRecoilState } from "recoil";

const Ticket = () => {
	const [listPanier, editPanier] = useRecoilState(panier);
	const [totalG, editTotalG] = useRecoilState(totalPanier);

	React.useEffect(() => {
		let total = 0;
		listPanier.forEach((el) => {
			total += (el.article.magst_prix * el.quantite);
		})

		editTotalG(total);
	},[listPanier, editTotalG])

	const showTicket = () => {
		let res = [];
		listPanier.forEach((el, index) => {
			res.push(
				<tr key={index}>
					<td>{el.article.prd_nom}</td>
					<td>{el.article.magst_prix}</td>
					<td>X {el.quantite}</td>
					<td>{el.article.magst_prix * el.quantite}</td>
					<td>
						<Button color="success" size="sm" className="m-1" disabled={el.quantite >= el.article.magst_quantite ? true : false} onClick={() => incrementQuantitePanier(index)}>
							+1
						</Button>
						<Button color="success" size="sm" className="m-1"  disabled={el.quantite < 2 ? true : false} onClick={() => decrementQuantitePanier(index)}>
							-1
						</Button>
						<Button color="danger" size="sm" className="m-1" onClick={() => removeFromPanier(index)}>
							X
						</Button>
					</td>
				</tr>
			);
		});

		return <>{res}</>;
	};

	const incrementQuantitePanier = (index) => {
		let items = [...listPanier];
		let item = {...items[index]};

		++item.quantite;

		items[index] = item;

		editPanier(items);
	}

	const decrementQuantitePanier = (index) => {
		let items = [...listPanier];
		let item = {...items[index]};

		--item.quantite;

		items[index] = item;

		editPanier(items);
	}


	const removeFromPanier = (index) => {
		let items = [...listPanier];

		items.splice(index, 1);

		editPanier(items);
	}

	return (
		<Table hover responsive size="sm">
			<tbody>{showTicket()}</tbody>
			<tfoot>
				<tr>
					<td />
					<th>Total</th>
					<td />
					<td />
					<th>{totalG}</th>
				</tr>
			</tfoot>
		</Table>
	);
};

export default Ticket;
