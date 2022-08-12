# 删除空行
def remove(sheet, row):
    for cell in row:
        if cell.value != None:
                return
    sheet.delete_rows(row[0].row, 1)
