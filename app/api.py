from app.blog.endpoints import router as blog_router
from app.invoices.endpoints import router as invoices_router
# from app.contact.endpoints import router as contact_router
from fastapi import APIRouter

router = APIRouter()
router.include_router(blog_router, prefix="/blog", tags=["Blog"])
router.include_router(invoices_router, prefix="/invoices", tags=["Invoices"])
# router.include_router(contact_router, prefix="/contact", tags=["Contact"])
