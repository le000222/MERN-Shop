import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from "@mui/material";
// import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { createCate } from "../../actions/categoryAction";
import "./styles.css";

const CategoryForm = () => {
	const [currId, setCurrId] = useState(0);
	const obj = {
		name: "",
		description: "",
		img: "",
	};
	const [prodData, setProdData] = useState(obj);
	const dispatch = useDispatch();
	const product = useSelector(state =>
		currId ? state.products.find(p => p._id === currId) : null
	); //fetch data (current post) from redux
	// const categories = useSelector((state) => state.categories);

	useEffect(() => {
		if (product) setProdData(product);
	}, [product]);

	const handleSubmit = e => {
		e.preventDefault();

		if (
			prodData.name !== "" &&
			prodData.category !== "" &&
			prodData.description !== "" &&
			prodData.img !== ""
		) {
			dispatch(createCate(prodData));
		}
		console.error("Please fill out all information.");
		clear();
	};

	const clear = () => {
		setCurrId(null);
		setProdData(obj);
	};

	return (
		<div>
			<Paper className="paper">
				<form
					autoComplete="off"
					noValidate
					className="root form"
					onSubmit={handleSubmit}
				>
					<Typography variant="h6">
						{currId ? "Adding" : "Creating"} a Category
					</Typography>
					<TextField
						name="cateName"
						variant="outlined"
						label="Category Name"
						fullWidth
						value={prodData.name}
						required={true}
						onChange={e => {
							setProdData({ ...prodData, name: e.target.value });
						}}
					/>
					<TextField
						name="descriptions"
						variant="outlined"
						label="Descriptions"
						fullWidth
						required={true}
						value={prodData.description}
						onChange={e => {
							setProdData({
								...prodData,
								description: e.target.value,
							});
						}}
					/>
					<div className="fileInput">
						{/* <FileBase
              type='file'
              multiple={false}
              onDone={({ base64 }) => setProdData({ ...prodData, img: base64 })}
            /> */}
					</div>
					<Button
						className="buttonSubmit"
						variant="contained"
						color="primary"
						size="large"
						type="submit"
						fullWidth
					>
						Submit
					</Button>
					<Button
						variant="contained"
						color="secondary"
						size="small"
						onClick={clear}
						fullWidth
					>
						Clear
					</Button>
				</form>
			</Paper>
		</div>
	);
};

export default CategoryForm;
