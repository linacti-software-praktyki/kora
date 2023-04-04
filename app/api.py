from app.blog.endpoints import router as blog_router
from app.trackerofwork.endpoints import router as tracker_router
from app.finances.endpoints import router as finance_router
from app.invoices.endpoints import router as invoices_router
# from app.contact.endpoints import router as contact_router
from fastapi import APIRouter

router = APIRouter()
router.include_router(blog_router, prefix="/blog", tags=["Blog"])
router.include_router(tracker_router, prefix="/trackerofwork", tags=["TrackerOfWork"])
router.include_router(finance_router, prefix="/finances", tags=["Finances"])
router.include_router(invoices_router, prefix="/invoices", tags=["Invoices"])
# router.include_router(contact_router, prefix="/contact", tags=["Contact"])
