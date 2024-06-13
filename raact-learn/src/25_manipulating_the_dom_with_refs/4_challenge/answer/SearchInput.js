import {forwardRef} from "react";
export const SearchInput = forwardRef((props, ref)=>
    <input ref={ref} placeholder="Looking for something?"/>
)