"use client";
import React from 'react';


interface FilterCategoryProps {
    category: any,
    key: any,
    setCategory: any

}
function FilterCategoryMenu(
    { category,
        key,
        setCategory
    }: FilterCategoryProps

) {

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory);
    };

    return (
        <div>
            <div className="flex items-center" key={key}>
                <input
                    id={`filter-category-${key}`}
                    name="name"
                    value={category.categoryId}
                    type="radio"
                    onChange={(event) => handleCategoryChange(event.target.value)}
                    className="h-4 w-4 form-radio rounded border-gray-300 text-beige focus:ring-beige"
                />
                <label htmlFor={`filter-category-${key}`} className="ml-3 min-w-0 flex-1 text-gray-500">{category.name}</label>
            </div>
        </div>
    )

}

export default FilterCategoryMenu;