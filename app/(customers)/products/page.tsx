import Products from "@/components/Products"

interface productsProps {
  page: string,
  limit: string
}


export default async function ProductsPage( props : { searchParams?:Promise<{page?:string}>}) {
  const searchParams=await props.searchParams
  const currentPage=Number(searchParams?.page)||1

  return (
    <Products page={currentPage} />
  )
}

