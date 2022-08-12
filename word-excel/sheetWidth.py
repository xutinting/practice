from config import PATHS
from util import reset_col

_excel = PATHS['input_path'] + '/' +'表机构.xlsx'

reset_col(_excel)
print("Done-----------------------------------------自动调整列宽成功!")