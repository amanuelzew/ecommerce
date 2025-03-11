"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useMutation, useQuery } from "urql"
import { ProductsQuery } from "@/gql/productsQuery"
import { Product } from "@/types"
import { ProductMutation } from "@/gql/ProductMutation"
import { updateProductMutation } from "@/gql/updateProductMutation"
import { deleteProductMutation } from "@/gql/deleteProductMutation"
import { Category } from "@prisma/client"
import { searchProducts } from "@/lib/products"

type NewProduct={
    name: string
    description: string
    price: number
    quantity:number
    category: Category
}
export default function Products() {
  const [{data,error,fetching},replay]=useQuery({query:ProductsQuery})
  const [products,setProducts]=useState<Product[]>([])
  const [_,createProduct]=useMutation(ProductMutation)
  const [__,updateProduct]=useMutation(updateProductMutation)
  const [___,deleteProduct]=useMutation(deleteProductMutation)
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    description: "",
    price: 0.0,
    quantity:0,
    category: Category.OTHER,
  })

  const [selectedProduct, setSelectedProduct] = useState<Product|null>(null)
  const [editedProduct, setEditedProduct] = useState<Product|null>(null)
  const [productToDelete, setProductToDelete] = useState<Product|null>(null)
  
  const handleCreateProduct = async() => {
   const result=await createProduct({input:newProduct})
   //reload products and reset fields
   if(result.data){
    await replay({requestPolicy:"network-only"})
    setNewProduct({ name: "",description: "",price: 0.0,quantity:0,category: Category.OTHER})
   }
  }

  const handleUpdateProduct =async () => {
    const { id: id, ...product } = editedProduct!;
    console.log(selectedProduct,product,"iop")
    const result=await updateProduct({editProductId:selectedProduct?.id,input:product})
    if(result.data){
        await replay({requestPolicy:"network-only"})
        setEditedProduct(null)
    }
  }
  
  const handleDeleteProduct =async () => {
      const result=await deleteProduct({deleteProductId:productToDelete?.id})
      if(result.data){
          await replay({requestPolicy:"network-only"})
          setProductToDelete(null)
      }
  }

  const searchProducts=(query:string)=>{
    if(query=="")
    setProducts(data.products)
    else
    setProducts(products?.filter((product)=>product.name.includes(query.toLowerCase())))
  }
  
  useEffect(()=>{
    if(data && data.products){
      setProducts(data.products)
    }
  },[])
  // Open edit dialog with product data
  const openEditDialog = (product: any) => {
    setEditedProduct({ ...product })
    setSelectedProduct(product)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>

        {/* Add Product Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Fill in the details to create a new product.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Enter product name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5">$</span>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      className="pl-7"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price:parseFloat(e.target.value) })}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Enter product description"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value:Category) => setNewProduct({ ...newProduct, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder={Category.OTHER} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Category.BOOKS}>Books</SelectItem>
                      <SelectItem value={Category.CLOTHING}>Clothing</SelectItem>
                      <SelectItem value={Category.ELECTRONICS}>Electronics</SelectItem>
                      <SelectItem value={Category.HOME_GOODS}>Home Goods</SelectItem>
                      <SelectItem value={Category.OTHER}>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleCreateProduct}>Create Product</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-8" onChange={(e)=>searchProducts(e.target.value)}/>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="shoes">Shoes</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="w-full sm:w-auto">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            More Filters
          </Button>

          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {fetching ? (
        <div className="border rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading products...</p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product:Product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="h-12 w-12 relative rounded-md overflow-hidden">
                      <Image
                         src={"/next.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openEditDialog(product)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => setProductToDelete(product)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {/* pagination */}
      {/* <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1-{products?.length}</strong> of <strong>{products?.length}</strong> products
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8">
            1
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div> */}

      {/* Edit Product Dialog */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>Make changes to the product details.</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="general">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="pricing">Pricing & Inventory</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Product Name</Label>
                    <Input
                      id="edit-name"
                      value={editedProduct?.name}
                      onChange={(e) => setEditedProduct({ ...editedProduct!, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-category">Category</Label>
                    <Select
                      value={editedProduct?.category}
                      onValueChange={(value:Category) => setEditedProduct({ ...editedProduct!, category: value })}
                    >
                      <SelectTrigger id="edit-category">
                        <SelectValue placeholder={editedProduct!.category} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Category.CLOTHING}>Clothing</SelectItem>
                        <SelectItem value={Category.BOOKS}>Books</SelectItem>
                        <SelectItem value={Category.HOME_GOODS}>Home Goods</SelectItem>
                        <SelectItem value={Category.ELECTRONICS}>Electronics</SelectItem>
                        <SelectItem value={Category.OTHER}>Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editedProduct?.description}
                    onChange={(e) => setEditedProduct({ ...editedProduct!, description: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>

               
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing</CardTitle>
                    <CardDescription>Set the pricing information for your product.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-price">Regular Price</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5">$</span>
                          <Input
                            id="edit-price"
                            type="number"
                            step="0.01"
                            min="0"
                            className="pl-7"
                            value={editedProduct?.price}
                            onChange={(e) =>
                              setEditedProduct({ ...editedProduct!, price: Number.parseFloat(e.target.value) })
                            }
                          />
                        </div>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="images" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                    <CardDescription>Manage images for your product.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="relative border rounded-lg overflow-hidden h-[200px]">
                        <Image
                          src={"/next.svg"}
                          alt={""}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center h-[200px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-10 w-10 text-muted-foreground mb-2"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                          <circle cx="9" cy="9" r="2"></circle>
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                        </svg>
                        <p className="text-sm text-muted-foreground mb-2">Drag and drop an image or click to browse</p>
                        <Button variant="outline" size="sm">
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleUpdateProduct}>Save Changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the product "{productToDelete?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

