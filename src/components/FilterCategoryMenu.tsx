"use client";
import React from 'react';


interface FilterCategoryProps {
    category: any,
    index: any,
    setCategory: any

}
function FilterCategoryMenu(
    { category,
        index,
        setCategory
    }: FilterCategoryProps

) {

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory);
    };

    return (
        <div>
            <div className="flex items-center" key={index}>
                <input
                    id={`filter-category-${index}`}
                    name="name"
                    value={category.categoryId}
                    type="radio"
                    onChange={(event) => handleCategoryChange(event.target.value)}
                    className="h-4 w-4 form-radio rounded border-gray-300 text-beige focus:ring-beige"
                />
                <label htmlFor={`filter-category-${index}`} className="ml-3 min-w-0 flex-1 text-gray-500">{category.name}</label>



            </div>

        </div>


    )

    }

export default FilterCategoryMenu;