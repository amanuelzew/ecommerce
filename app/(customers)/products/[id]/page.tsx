import ProductDetail from "@/components/ProductDetail"

export default async function ProductPage({ params }: { params: { id: string } }) {

    const { id } = await params
    return (
        <ProductDetail id={id} />
    )
}

